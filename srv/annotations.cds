using ContentManagService as service from './cat-service';

annotate service.Folder with @(
    Capabilities.Insertable : true,
    odata.draft.enabled,
    UI                      : {
        Identification  : [{
            Value : folder_name,
            Label : 'Folder Name'
        }],
        SelectionFields : [
            folder_name,
            maincategory,
            email,
        ],
        LineItem        : [
            {Value : folder_name},
            {Value : maincategory},
            {Value : email},
            {Value : lastupdate},
            {Value : favourites},
            {Value : visitedtimes},
            {Value : lastvisited}
        ]
    }
);

annotate service.Folder with @(UI : {
    HeaderInfo          : {
        TypeName       : 'Folder',
        TypeNamePlural : 'Folder Details',
        ImageUrl       : imageurl,
        Title          : {Value : folder_name},
    // Description    : {Value : maincategory}
    },
    Facets              : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'File Details',
        Target : 'files/@UI.LineItem'
    }],
    HeaderFacets        : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'Folder Detail',
        Target : '@UI.FieldGroup#Details'
    }],
    FieldGroup #Details : {Data : [
        //  {Value : folder_name},
        {Value : maincategory},
        {Value : email},
        {Value : imageurl},
        {Value : favourites},
    ]},
});


annotate service.Folder with {
    folder_name  @title : 'Folder'  @mandatory;
    maincategory @title : 'Category'  @mandatory 
    @Common     : {
        ValueListWithFixedValues : true,
        ValueList                : {
            // SearchSupported : true,
            CollectionPath : 'VH_categories',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'maincategory',
                ValueListProperty : 'maincategory'
            }]
        }
    };
    email        @title : 'Email'  @mandatory  @assert.format : '^([^.@]+)(\.[^.@]+)*@([^.@]+\.)+([^.@]+)$';
    ID           @title : 'ID';
    imageurl     @title : 'Folder Image';
    favourites   @title : 'Favourities';
    visitedtimes @title : 'Visited Count';
    lastupdate   @title : 'Last Update'
}


annotate service.files with @(UI : {
    Identification  : [{
        Value : title,
        Label : 'File Details'
    }],
    SelectionFields : [category],
    LineItem        : [
        {Value : ID, },
        {Value : category, },
        {Value : comments, },
        {Value : title, },
        {Value : favourites},
        {Value : visitedtimes},
    ]
});

annotate service.files with @(UI : {
    HeaderInfo          : {
        TypeName       : 'File',
        TypeNamePlural : 'File Details',
        Title          : {Value : title},
    // Description    : {Value : maincategory}
    },
    Facets              : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Links for Reference',
            Target : 'file_path/@UI.LineItem'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'Tags Attached',
            Target : 'tags/@UI.LineItem'
        }
    // {
    //     $Type  : 'UI.ReferenceFacet',
    //     Label  : 'Folder Detail',
    //     Target : '@UI.FieldGroup#Details'
    // }
    ],
    HeaderFacets        : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'File Details',
        Target : '@UI.FieldGroup#Details'
    }],
    FieldGroup #Details : {Data : [
        {Value : category},
        {Value : comments},
    ]},
});

annotate service.files with {
    ID           @title : 'ID';
    category     @title : 'Category';
    comments     @title : 'Comments'  @UI.MultiLineText;
    title        @title : 'Title';
    favourites   @title : 'Favourities';
    visitedtimes @title : 'Visited Count';
    lastupdate   @title : 'Last Update'
}

annotate service.file_path with @(UI : {
    Identification : [{
        Value : title,
        Label : 'File Path'
    }],
    LineItem       : [
        // {Value : up__ID},
        {Value : title, },
        {
            Value : url,
            Url   : url,
            $Type : 'UI.DataFieldWithUrl'
        },
        {Value : comments, },
        {Value : isImageURL, },
    ]
});

annotate service.file_path with @(UI : {HeaderInfo : {
    TypeName       : 'Url',
    TypeNamePlural : 'Url Details',
    Title          : {Value : title},
    Description    : {Value : url}
}});

annotate service.file_path with {
    title      @title : 'Title';
    url        @title : 'Url';
    comments   @title : 'Comments';
    isImageURL @title : 'Image Link'
}

annotate service.tag_path with @(UI : {
    Identification : [{
        Value : tag_name,
        Label : 'Tags Attached'
    }],
    LineItem       : [{Value : tag_name, }]
});

annotate service.tag_path with @(UI : {HeaderInfo : {
    TypeName       : 'Tags',
    TypeNamePlural : 'Tags Details',
    Title          : {Value : tag_name},
// Description    : {Value : url}
}});

annotate service.tag_path with {
    tag_name @title : 'Tags';
// url  @title : 'Url';
}


// annotate service.VH_Categories with {
//     Code @(
//         title  : '{i18n>Code}',
//         UI     : {Hidden : true},
//         Common : {Text : {
//             $value                 : Text,
//             ![@UI.TextArrangement] : #TextOnly
//         }}
//     );
//     Text @(
//         title : '{i18n>Category}',
//         UI    : {HiddenFilter : true}
//     );
// };
