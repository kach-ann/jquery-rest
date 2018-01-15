$(function () {
    renderPublications();
});

function renderPublications() {
    $('div.container').html(`
        <div class="jumbotron">
            <h1 class="display-4">Publications</h1>
            <hr class="my-4">
            <p class="lead">
                <a id="new-publication" class="btn btn-primary btn-lg" href="#" role="button"><i class="fa fa-file-text" aria-hidden="true"></i> New</a>
            </p>
        </div>
        
        <form id="sort-form" class="form-inline">
             <div class="form-group">
                <label for="sort">Sort by publication date</label>
                <select id="sort" class="form-control">
                    <option value="desc">Older</option>
                    <option value="asc" selected>Newer</option>
                </select>
                <button type="submit" class="btn btn-success"><i class="fa fa-sort-amount-asc" aria-hidden="true"></i> Sort</button>
              </div>   
        </form>

        <div id="publication-list">
        </div>
    `);

    $('#new-publication').click((event)=> {
        $('#new-publication-modal').modal('show');
    })

    $('#save-publication').submit((event)=>{
        event.preventDefault();

        let newPublication = $(event.target).serializeArray()
            .reduce(function(a, x) { a[x.name] = x.value; return a; }, {});

        if (!newPublication.id) {
            delete newPublication.id;
            restService.postPublication (newPublication, () => updateHandler(event))
        } else {
            restService.updatePublication(newPublication, () => updateHandler(event))
        }


    });

    $('#sort-form').submit((event)=> {
        let sort = $('#sort').val()
        displayPublication(sort);
    });

    displayPublication();
}

function updateHandler(event) {
    event.target.reset();
    $('#new-publication-modal').modal('hide');
    displayPublication();
}
function displayPublication(sort = 'asc') {
    let $publicationList = $('#publication-list');
    $publicationList.html("");

    restService.getPublication((resp) => {
        for (let publication of resp._embedded.publications) {
            const publicationElement = `
            <div class="row publication-item">
                <div class="col-10">
                    <div data-publication-id="${publication.id}" class="card">
                      <div class="card-body">
                        <h5 class="card-title">${publication.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${publication.publicationDate}</h6>
                        <p class="card-text">${publication.description}</p>
                      </div>
                    </div>
                </div>
                <div class="col-2 d-none action-buttons">
                    <button data-publication-id="${publication.id}" type="button" class="btn btn-warning edit-publication"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    <button data-publication-id="${publication.id}" type="button" class="btn btn-danger delete-publication"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
            </div>
            `;
            $publicationList.append(publicationElement);
        }

        $('.delete-publication').click((event) => {
            let publicationId = +$(event.currentTarget).data("publication-id");
            restService.deletePublication(publicationId, (resp) => {
                displayPublication();
            })
        })

        $('.edit-publication').click((event) => {
            let publicationId = +$(event.currentTarget).data("publication-id");
            restService.getPublicationById(publicationId, (publication) => {
                $('input[name="id"]').val(publication.id);
                $('input[name="title"]').val(publication.title);
                $('textarea[name="description"]').val(publication.description);
                $('#new-publication-modal').modal('show');
            })

        })


        $('#publication-list div.card').click((event) => {
            let publicationId = +$(event.currentTarget).data("publication-id");
            navigateToPublicationDetail(publicationId);
        });

        $('.publication-item').mouseover((event) => {
            $(event.currentTarget).find('.action-buttons').removeClass('d-none')
        });

        $('.publication-item').mouseout((event) => {
            $(event.currentTarget).find('.action-buttons').addClass('d-none')
        });

    }, sort);
}




