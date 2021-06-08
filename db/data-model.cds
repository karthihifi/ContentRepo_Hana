// namespace my.bookshop;

// entity Books {
//   key ID : Integer;
//   title  : String;
//   stock  : Integer;
// }

using {
    Currency,
    User,
    managed,
    cuid
} from '@sap/cds/common';

namespace my.contentmanag;

entity Folder : cuid, managed {
    key ID           : UUID;
        folder_name  : String;
        email        : String;
        maincategory : String;
        lastupdate   : Timestamp @cds.on.insert : $now  @cds.on.update : $now;
        category     : Composition of many category
                           on category.up_ = $self;
        files        : Composition of many files
                           on files.up_ = $self;
        imageurl     : String    @Core.IsURL  @Core.MediaType          : 'image/png';
        // imageType    : String    @Core.IsMediaType;
// files        : Association to files;
}

entity category {
    key ID         : UUID;
        up_        : Association to Folder;
        categories : String;
}

entity files {
    key ID         : UUID;
        up_        : Association to Folder;
        file_path  : Composition of many file_path
                         on file_path.up_ = $self;
        tags       : Composition of many tags
                         on tags.up_ = $self;
        // file_path  : Association to file_path;
        // tags       : Association to tags;
        category   : String;
        comments   : String;
        lastupdate : Timestamp @cds.on.insert : $now  @cds.on.update : $now;
        title      : String;
}

type Url {
    description : String;
    url         : String;
}

entity file_path {
    key ID          : UUID;
        up_         : Association to files;
        // key file_path_id : Integer;
        description : String;
        url         : String;
}

entity tags {
    key ID   : UUID;
        up_  : Association to files;
        // key tag_id : Integer;
        tags : String;
}
