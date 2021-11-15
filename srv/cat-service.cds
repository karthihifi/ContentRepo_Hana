using my.contentmanag as my from '../db/data-model';

service ContentManagService {
    // @readonly entity Books as projection on my.Books;

    entity Folder        as projection on my.Folder;
    entity VH_categories as projection on my.maincategory;

// entity VH_categories as
//     select from my.Folder as a {
//         a.maincategory as Category
//     }
//     group by
//         maincategory
// entity Files  as projection on my.files;
// entity Category as projection on my.category;
//     entity Category  as
//         select from my.Folder as a
//         left join my.category as b
//             on a.ID = b.ID
//         {
//             a.ID         as ID,
//  //           b.CatID      as Cat_ID,
//             b.categories as Category
//         };

// entity Tags      as
//     select from my.files as a
//     left join my.tags as b
//         on a.ID = b.ID
//     {
//         a.ID     as ID,
//         b.tag_id as Tag_ID,
//         b.tags   as Tag
//     };

// entity File_path as
//     select from my.files as a
//     left join my.file_path as b
//         on a.ID = b.ID
//     {
//         a.ID           as ID,
//         b.file_path_id as file_ID,
//         b.desc         as Description,
//         b.url          as URl
//     };
}
