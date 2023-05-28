class UsersPage extends CodBellElement {
    constructor() {
        super();
    }
    on__load(){
        this.reload()
    }
    getContent() {
        return `
        <loading-view :value="loading" class="card" style="max-height: calc(100vh - 98px);">
            <div class="flex-row">
                <div class="flex-row">
                    <button if="can_add" class="btn sm" @click="add_record">Add New</button>
                    <button class="btn sm ml-1" @click="only_reload">Reload</button>
                </div>
            </div>
            <div class="table_holder">
                <table class="table" title="Table on Plain Background">
                    <thead class="">
                        <tr for-loop="columns.length">
                            <th bind :text="getColumnName(columns[index])"></th>
                        </tr>
                    </thead>
                    <tbody class="" for-loop="(records && records[currentPage])?records[currentPage].length:0">
                        <tr for-loop="columns.length" index_var="column_index">
                            <td>
                                <img if="columns[column_index].type && columns[column_index].type == 'image' "
                                    :src="records[currentPage][index][columns[column_index].key]" />
                                <span if="columns[column_index].type && columns[column_index].type == 'date_time' "
                                    :text="getFullDateTime(records[currentPage][index][columns[column_index].key])"></span>
        
                                <span if="columns[column_index].type && columns[column_index].type == 'boolean' ">
                                    <span if='records[currentPage][index][columns[column_index].key]'
                                        class="badge bg-success">Yes</span>
                                    <span if='!records[currentPage][index][columns[column_index].key]'
                                        class="badge bg-danger">No</span>
                                </span>
                                <div if="columns[column_index].type && columns[column_index].type == 'actions'" class="btns">
                                    <button class="btn sm" @click="edit_record(event, records[currentPage][index])">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </button>
                                    <button if="can_delete" class="btn sm danger" @click="delete_record(event, records[currentPage][index])">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </div>
                                <span if="!columns[column_index].type"
                                    :text="records[currentPage][index][columns[column_index].key]"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex-row">
                <label>
                    Showing <span bind :text="(records && records[currentPage])?records[currentPage].length:'0'"></span>
                    out of <span bind :text="recordsTotal.toString()"></span>
                    (total <span bind :text="recordsFiltered.toString()"></span>)
                </label>
                <pagination-view @input="change_page" :value="currentPage" :max="recordsFiltered/perPage">
                </pagination-view>
            </div>
        </loading-view>
        <modal-view :value="RecordstoDelete.length" @closed="model_updated">
            <div class="flex-column">
                <label if="RecordstoDelete.length == 1" style="font-size: larger;"> Do you want to delete this record ? </label>
                <label if="RecordstoDelete.length > 1" style="font-size: larger;"> Do you want to delete these records ? </label>
                <div if="!loading" class="flex-row p-1" style="justify-content: end; padding-bottom: 0;">
                    <button class="btn sm danger" @click="delete_now">Yes</button>
                    <button class="btn sm ml-1" @click="cancel_delete">No</button>
                </div>
                <label if="loading" class="p-1" if="RecordstoDelete.length == 1"> Ok Deleting ...... </label>
            </div>
        </modal-view>
        `
    }
    getData() {
        return {
            api: "users",
            delete_api : "delete_users",
            loading : false,
            can_delete : true,
            can_add : true,
            sort_by : "id",
            desc : true,
            search : "",
            perPage : 10,
            currentPage : 1,
            conditions : {},
            records : [],
            RecordstoDelete:[],
            recordsTotal : 0,
            recordsFiltered : 0,
            searched : "",
            columns :[
                { key: "ID", sortable: true, visible: true, searchable : true },
                { key: "Photo", type: 'image', sortable: false, visible: true },
                { key: "Name", sortable: false, visible: true, searchable : true },
                { key: "Email", sortable: false, visible: true, searchable : true },
                { key: "Mobile", sortable: false, visible: true, searchable : true },
                { key: "IsAdmin", type: 'boolean', title:'Admin', sortable: false, visible: true, searchable : true, searchtype :'vendor' },
                { key: "LastActiveOn", type: 'date_time', sortable: true, visible: true, searchable : true, searchtype :'date' },
                { key: "CreatedAt", type: 'date_time', sortable: true, visible: true, searchable : true, searchtype :'date' },
                // { key: "UpdatedAt", type: 'date_time', sortable: true, visible: false, searchable : true, searchtype :'date' },
                { key: "", title:'Actions', type: 'actions', sortable: false, visible: true, searchable : false },
            ],
        }
    }
    delete_record(event, record){
        this.data.RecordstoDelete.push(record.ID)
    }
    model_updated(event, record){
        this.cancel_delete()
    }
    cancel_delete(){
        this.data.RecordstoDelete = []
    }
    edit_record(event, record){
        window.edit_user = JSON.parse(JSON.stringify(record))
        window.codebell_navigate("/user/"+record.ID)
    }
    add_record(){
        window.edit_user = {
            Name : "",
            Email : "",
            Mobile : "",
            IsAdmin : "",
            Photo : "",
        }
        window.codebell_navigate("/user/new")
    }
    change_page(event){
        this.data.currentPage = parseInt(event.data)
        if(!this.data.records[this.data.currentPage]){   
            this.loadData({
                page: this.data.currentPage
            })
        }
    }
    delete_now(){
        this.deletedata({
            records_to_delete : this.data.RecordstoDelete,
        })
    }
    deletedata = debounce((request_data) => {
        if (!request_data) {
            alert("wrong request")
            return
        }
        this.data.loading = true;
        window.call_api(this.data.delete_api, request_data).then((data) => {
            if (data.Status == 2) {
                debugger
                this.data.RecordstoDelete = []
                this.data.records= []
                this.loadData({
                    page : this.data.currentPage
                })
            }
            return data
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.data.loading = false;
        });
    }, 300)
    only_reload(){
        this.data.records[this.data.currentPage] = []
        this.loadData({
            page : this.data.currentPage
        })
    }
    reload(){
        this.data.records= []
        this.data.currentPage = 1
        this.loadData({
            page : this.data.currentPage
        })
    }
    loadData = debounce((request_data) => {
        if (!request_data || !request_data.page) {
            alert("wrong request")
            return
        }
        request_data.sort = this.data.sort_by
        request_data.sortdesc = this.data.desc
        request_data.limit = this.data.perPage
        if(this.data.conditions){
            request_data.fix_condition = this.data.conditions
        }
        this.data.search = this.data.search.trim()
        if(this.data.search){
            request_data.search = this.data.search.replace(": ", '":"')
        }
        this.data.loading = true;
        window.call_api(this.data.api, request_data).then((data) => {
            if (data.Status == 2) {
                this.data.records[request_data.page] = data.data
                this.data.recordsTotal = data.recordsTotal
                this.data.recordsFiltered = data.recordsFiltered
                this.data.searched = this.data.search.trim()
            }
            return data
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.data.loading = false;
        });
    }, 300)
}
window.customElements.define('users-page', UsersPage);