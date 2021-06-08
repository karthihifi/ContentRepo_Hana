const cds = require('@sap/cds')

// const { Contentmanag_serv } = cds.entities('my.contentmanag')

class ContentManagService extends cds.ApplicationService {
    async init() {
        this.before('CREATE', 'Folder', async (req) => {

            //          console.log(this.on('READ', 'Folder', () => SELECT.from(Folder)))
            const folder = req.data
            const folder1 = SELECT.from('Folder').where({ folder_name: folder.folder_name })
            const Items = await cds.tx(req).run(
                folder1)
            console.log('testq', Items.length, Items)
            if (Items.length >= 1) { req.reject(409, 'Folder Name already exists,Please create with different name') }
        })

        return super.init()
    }
}

module.exports = { ContentManagService }