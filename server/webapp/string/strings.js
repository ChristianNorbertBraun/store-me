/**
 * Created by christian on 14.05.15.
 */

var templates = {
    login: "design/login.tpl",
    register: "design/register.tpl",
    dashboard: "design/dashboard.tpl",
    manager: "design/manager.tpl",
    inventory: "design/inventory.tpl"
};

var english = {

    link:{
        toDashboard:"dashboard.html",
        dbConnection:"http://localhost:5984"
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
        wrongPassword:"Password is incorrect"
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
                name:'Test Container',
                parentid:'',
                attributes:[{
                    name:'width',
                    value:'200',
                    unit:'cm',
                    type:'quantity',
                    must:true
                },
                {
                    name:'height',
                    value:'300',
                    unit:'cm',
                    type:'quantity',
                    must:true
                }],
                items:[{
                    name:'Nothing',
                    id:'2',
                    amount:20,
                    attributes:[{
                        name:'height',
                        value:'300'
                    }]
                }],
                subcontainer:[{
                    name:'Test Container',
                    parentid:'',
                    attributes:[{
                        name:'width',
                        value:'200',
                        unit:'cm',
                        type:'quantity',
                        must:true
                    },
                        {
                            name:'height',
                            value:'300',
                            unit:'cm',
                            type:'quantity',
                            must:true
                        }],
                    items:[{
                        name:'Nothing',
                        id:'2',
                        amount:20,
                        attributes:[{
                            name:'height',
                            value:'300'
                        }]
                    }]
                }]
            },
                {
                    name:'Test Container2',
                    parentid:'',
                    attributes:[{
                        name:'liquid',
                        value:'true',
                        type:'boolean',
                        must:true
                    },
                        {
                            name:'weight',
                            value:'300',
                            unit:'kg',
                            type:'quantity',
                            must:true
                        }],
                    items:[{
                        name:'Nothing',
                        id:'2',
                        amount:20,
                        attributes:[{
                            name:'height',
                            value:'300'
                        }]
                    }],
                    subcontainer:[{
                        name:'Test Container',
                        parentid:'',
                        attributes:[{
                            name:'width',
                            value:'200',
                            unit:'cm',
                            type:'quantity',
                            must:true
                        },
                            {
                                name:'height',
                                value:'300',
                                unit:'cm',
                                type:'quantity',
                                must:true
                            }],
                        items:[{
                            name:'Nothing',
                            id:'2',
                            amount:20,
                            attributes:[{
                                name:'height',
                                value:'300'
                            }]
                        }]
                    }]
                }]
        }
    },

    inventory: {

    }
};

var strings = english;