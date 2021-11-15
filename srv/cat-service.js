const fetch = require('node-fetch')
const Unsplash = require('unsplash-js')
const cds = require('@sap/cds')
// import { createApi } from 'unsplash-js';

// const { Contentmanag_serv } = cds.entities('my.contentmanag')

class ContentManagService extends cds.ApplicationService {
    async init() {

        this.after("*", async (each, req) => {
            if (req.res) {
                req.res.set("Access-Control-Allow-Origin", "*");
            }
        });
        this.before('CREATE', 'Folder', async (req) => {
            // let image;
            // console.log(Folder)
            //          console.log(this.on('READ', 'Folder', () => SELECT.from(Folder)))
            const folder = req.data
            const folder1 = SELECT.from('Folder').where({ folder_name: folder.folder_name, maincategory: folder.maincategory })
            const Items = await cds.tx(req).run(
                folder1)
            // console.log('testq', Items.length, Items)
            if (Items.length >= 1) { req.reject(409, 'Folder Name already exists,Please create with different name') }
            // let imgUrl = 'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixid=MnwxNjI3Mzd8MHwxfHNlYXJjaHwxfHxKYXBhbnxlbnwwfHx8fDE2MjYyNjU0NjM&ixlib=rb-1.2.1'
            let folderdata = req.data;
            // folderdata.imageurl = imgUrl
            // folderdata.visitedtimes = 1
            // return folderdata
            // updateFolder(imgUrl, req);
            // console.log('Folder Image', folder.imageurl);
            if (folder.imageurl == null || folder.imageurl == undefined || folder.imageurl == '') {
                console.log('Folder Image 1', folder.imageurl);
                global.fetch = fetch
                const unsplash = Unsplash.createApi({
                    accessKey: '6etjxzIxDlkK4Ku7oOqlExEQ9znpTqwGFxagTU2v22g',
                    // fetch: fetch.nodeFetch,
                });
                const result = await unsplash.search.getPhotos({
                    query: folder.folder_name,
                    page: 1,
                    perPage: 1
                })
                console.log(result.response.results[0])
                folderdata.imageurl = result.response.results[0].urls.regular
                // .then(result => {
                //     if (result.errors) {
                //         // handle error here
                //         console.log('error occurred: ', result.errors[0]);
                //     } else {
                //         // handle success here
                //         const photo = result.response;
                //         console.log('Received Results', photo.results[0].urls.raw);
                //        image =  photo.results[0].urls.raw
                //         // console.log(req.data)
                //     }
                // });
                // console.log('Image',image)
            }
            let todaysdate = new Date();
            folderdata.lastvisited = todaysdate.toLocaleString()
            return folderdata
        })

        // this.after('CREATE', 'Folder', async (req) => {
        // const folder = req
        // console.log('Folder Image', folder);
        // if (folder.imageurl == null || folder.imageurl == undefined || folder.imageurl == '') {
        //     console.log('Folder Image 1', folder.imageurl);
        //     global.fetch = fetch
        //     const unsplash = Unsplash.createApi({
        //         accessKey: '6etjxzIxDlkK4Ku7oOqlExEQ9znpTqwGFxagTU2v22g',
        //         // fetch: fetch.nodeFetch,
        //     });
        //     let imgUrl = 'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixid=MnwxNjI3Mzd8MHwxfHNlYXJjaHwxfHxKYXBhbnxlbnwwfHx8fDE2MjYyNjU0NjM&ixlib=rb-1.2.1'
        // updateFolder(imgUrl, req);
        // req.
        // return
        // unsplash.search.getPhotos({
        //     query: 'Japan',
        //     page: 1,
        //     perPage: 1
        // }).then(result => {
        //     if (result.errors) {
        //         // handle error here
        //         console.log('error occurred: ', result.errors[0]);
        //     } else {
        //         // handle success here
        //         const photo = result.response;
        //         console.log('Received Results', photo.results[0].urls.raw);
        //         const imgUrl = photo.results[0].urls.raw
        //         console.log(req.ID)
        //         // updateFolder(imgUrl, req);
        //     }
        // });
        // }
        // })

        // async function updateFolder(imgUrl, req) {
        //     console.log('Update Folder func called', req.ID, imgUrl)
        //     const query = UPDATE('Folder').set({ imageurl: imgUrl }).where({ ID: req.ID })
        //     //  const query = UPDATE('Folder').set({ visitedtimes: { '+=': 1 } }).where({ ID: req.ID })
        //     const tx = cds.tx(req)
        //     // const folder1 = SELECT.from('Folder').where({ ID: req.ID })
        //     // const Items = await cds.tx(req).run(
        //     //     folder1)
        //     // console.log(Items);
        //     const affectedrows  = await tx.run(query)
        //     console.log('affect',affectedrows);
        // }
        this.before('READ', 'Folder', async req => {
            // console.log('Folder ID', req.data.ID);
            if (req.data.ID != undefined) {
                const Folderdata = req.data;
                let todaysdate = new Date();
                let lastvisited = todaysdate.toLocaleString()
                // console.log('Folderdata', Folderdata.ID)
                const query = UPDATE('Folder').set({ visitedtimes: { '+=': 1 }, lastvisited: lastvisited }).where({ ID: Folderdata.ID })
                const tx = cds.tx(req)
                await tx.run(query)
            }
        })

        this.before('UPDATE', ['Folder', 'files'], async (req) => {
            // console.log('Update req', req.data)
            let folderdata = req.data;
            let todaysdate = new Date();
            global.fetch = fetch
            const unsplash = Unsplash.createApi({
                accessKey: '6etjxzIxDlkK4Ku7oOqlExEQ9znpTqwGFxagTU2v22g',
            });
            folderdata.lastvisited = todaysdate.toLocaleString()
            folderdata.filecount = folderdata.files.length
            console.log('Update req', folderdata.files.length)
            if (folderdata.files.length >= 1) {
                for (let i = 0; i < folderdata.files.length; i++) {
                    if (folderdata.files[i].imageurl == null || folderdata.files[i].imageurl == undefined || folderdata.files[i].imageurl == '') {
                        console.log('Folder Image 1', folderdata.files[i].imageurl);
                        const result = await unsplash.search.getPhotos({
                            query: folderdata.files[i].title,
                            page: 1,
                            perPage: 1
                        })
                        console.log(result.response.results[0])
                        folderdata.files[i].imageurl = result.response.results[0].urls.regular
                    }
                    folderdata.files[i].lastvisited = todaysdate.toLocaleString()
                }
            }
            return folderdata
        })

        this.before('READ', 'files', async (res) => {
            if (res.data.ID != undefined) {
                const FileData = res.data;
                let todaysdate = new Date();
                let lastvisited = todaysdate.toLocaleString()
                const query = UPDATE('files').set({ visitedtimes: { '+=': 1 }, lastvisited: lastvisited }).where({ ID: FileData.ID })
                const tx = cds.tx(res)
                await tx.run(query)
            }
        })

        // this.before('CREATE', 'files', async (req) => {
            // console.log('test call', req)
            // let filedata = req.data;
            // let todaysdate = new Date();
            // filedata.lastvisited = todaysdate.toLocaleString()
            // console.log('FileData', filedata)
            // if (filedata.imageurl == null || filedata.imageurl == undefined || filedata.imageurl == '') {
            //     console.log('Folder Image 1', filedata.imageurl);
            //     global.fetch = fetch
            //     const unsplash = Unsplash.createApi({
            //         accessKey: '6etjxzIxDlkK4Ku7oOqlExEQ9znpTqwGFxagTU2v22g',
            //     });
            //     const result = await unsplash.search.getPhotos({
            //         query: filedata.title,
            //         page: 1,
            //         perPage: 1
            //     })
            //     console.log(result.response.results[0])
            //     filedata.imageurl = result.response.results[0].urls.regular
            // }
            // return filedata
        // })

        this.after('CREATE', 'files', async (req) => {
            console.log('During Create',req)
        })

        return super.init()
    }
}

module.exports = { ContentManagService }