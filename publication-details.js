function navigateToPublicationDetail(publicationId) {
    restService.getPublicationById(publicationId, (resp) => {
        let publication = resp;
        const publicationELemnt = `
            <button id="back-botton" type="button" class="btn btn-dark"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
            <h1 class="bg-light">${publication.title}</h1>
            <div class="card">
              <div class="card-body">
                <p>${publication.description}</p>
              </div>
            </div>
            `;
        $('.container').html(publicationELemnt);

        $("#back-botton").click((event)=>{
            renderPublications();
        })
    })

}