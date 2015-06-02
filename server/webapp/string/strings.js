/**
 * Created by christian on 14.05.15.
 */

var templates = {
    login: "design/login.tpl",
    register: "design/register.tpl",
    dashboard: "design/dashboard.tpl",
    manager: "design/manager.tpl"
};

var english = {
    login:{
        button:"login",
        question:"Don't have a StoreMe account yet?",
        signup:"Sign Up!"
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
                    action: 'stored',
                    date: '16:25 13.03.2003',
                    container: 'R4 F2 B3',
                    item: 'Hohlkopfzylinder',
                    amount: '245',
                    employee: 'Marvin Therolf'
                },

                {
                    action: 'removed',
                    date: '09:47 09.03.2003',
                    container: 'R2 F1 B12',
                    item: 'Playstation 4',
                    amount: '1337',
                    employee: 'Marcel Grossleska'
                },

                {
                    action: 'stored',
                    date: '12:32 18.04.2003',
                    container: 'R5 F2 B10',
                    item: 'iPhone 4S',
                    amount: '12',
                    employee: 'Christian Braun'
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
        data:{
            container:[{
                name:"Test Container",
                parentid:"",
                attributes:[{
                    name:'width',
                    value:'200',
                    unit:'cm',
                    type:'quantity',
                    must:true
                }
                ]
            }]
        }
    }
};

var strings = english;