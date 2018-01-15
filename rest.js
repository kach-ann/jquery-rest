let RestService = function () {
   this.url = 'http://localhost:9999/publications';
};

RestService.prototype.getPublication = function (cb, sort) {
    $.ajax({
        url: `${this.url}/?sort=publicationDate,${sort}`
    }).done(cb);
};

RestService.prototype.postPublication = function (publication, cb) {
    $.ajax({
        method: "POST",
        url: this.url,
        data: JSON.stringify(publication),
        contentType : "application/json"
    }).done(cb);
}

RestService.prototype.getPublicationById = function (publicationId, cb) {
    $.ajax({
        url: `${this.url}/${publicationId}`
    }).done(cb);
}

RestService.prototype.deletePublication = function (publicationId, cb) {
    $.ajax({
        method: "DELETE",
        url: `${this.url}/${publicationId}`
    }).done(cb);
}

RestService.prototype.updatePublication = function (publication, cb) {
    $.ajax({
        method: "PUT",
        url: `${this.url}/${publication.id}`,
        data: JSON.stringify(publication),
        contentType : "application/json"
    }).done(cb);
}



let restService = new RestService();