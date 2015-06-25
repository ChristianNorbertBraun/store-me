/**
 * Created by christian on 14.05.15.
 */

var templates = {
    login: "design/login.tpl",
    register: "design/register.tpl",
    dashboard: "design/dashboard.tpl",
    manager: "design/manager.tpl",
    inventory: "design/inventory.tpl",
    coredata: "design/coredata.tpl"

};

var english = {
    fixeddata:{
        queryparams: "sessionid"
    },
    link:{
        toDashboard:"dashboard",
        toManager:"manager",
        toCoredata:"coredata",
        toInventory:"inventory",
        dbConnection:"http://localhost:5984",
        backendConnection:"http://localhost:8080"
    },

    database:{
        container:"storemecontainer",
        user:"storemeusers",
        items:"storemeitems",
        category:"storemecategory",
        attributes: "storemeattributes"
    },

    registration:{
        noUsername:"Missing username!",
        noPassword:"Missing password!",
        passwordDontMatch:"Password doesn't match the confirmation!",
        userExist: "User already exist!",
        creatingError: "Error while creating User",
        PasswordNotSafe: "Password is not Safe \n Password must contain: \n - at least 7 characters \n - a small letter \n - a big letter \n - a number"
    },

    login:{
        button:"Login",
        question:"Don't have a StoreMe account yet?",
        signup:"Sign Up!",
        noUsername:"Please enter a Username",
        noPassword:"Please enter a Password",
        noUser:"There is no User with this Username",
        wrongPassword:"Password is incorrect",
        loginfailed:"Login failed"
    },

    category:{
        noInput: "There is no Input!",
        noCategory: "no Category choosen!",
        alreadyExist: "Category already Exist"
    },

    item:{
        noInput: "There is no Input!",
        noItemMarked: "Please Select an Item!"
    },

    dashboard: {

        button: {
            stock: "Manage Stock",
            overview: "Stock Overview"
        },

        panel: {
            title: {
                info: "Storage Info"
            },

            content: {
                info: {
                    admin: "Storage admin:",
                    container: "Container:",
                    items: "Items:",
                    volume: "Volume:"
                }
            }
        },

        table: {
            header: [
                {
                    column: 'Action'
                },
                {
                    column: 'Date'
                },
                {
                    column: 'Container'
                },
                {
                    column: 'Item'
                },
                {
                    column: 'Amount'
                },
                {
                    column: 'Employee'
                }
            ],

            data: [
                {
                    stored: true,
                    date: '16:25 13.03.2003',
                    container: 'R4 F2 B3',
                    item: 'Hohlkopfzylinder',
                    amount: '245',
                    employee: 'Marvin Therolf'
                },

                {
                    stored: false,
                    date: '09:47 09.03.2003',
                    container: 'R2 F1 B12',
                    item: 'Playstation 4',
                    amount: '1337',
                    employee: 'Marcel Grossleska'
                },

                {
                    stored: true,
                    date: '12:32 18.04.2003',
                    container: 'R5 F2 B10',
                    item: 'iPhone 4S',
                    amount: '12',
                    employee: 'Christian Braun'
                },

                {
                    stored: false,
                    date: '17:33 09.05.2003',
                    container: 'R5 F3 B34',
                    item: 'Macbook Pro 15 Zoll',
                    amount: '37',
                    employee: 'Christian Paling'
                }
            ]
        }
    },

    manager: {
        panels:[{
                title:'Container'
            },
            {
                title:'Items'
            }],
        info:{
            title:'Item Info'
        },

        pathElements:[],

        data:{
            container:[]
        }
    },

    inventory: {
        panel: {
            title: {
                criteria: 'Criterias',
                attribute: 'Attributes',
                inventorytable: 'Inventory Table'
            }
        }
    },

    coredata: {
        panel: {
            title: {
                category: 'Categories'
            }
        }
    }
};

var strings = english;

if (typeof module !== "undefined"){
    module.exports = strings;
}
