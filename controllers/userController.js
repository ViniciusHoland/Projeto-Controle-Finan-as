
const users = [
    {login: 'vinicius',
    password: '123'
    }
]

const getUser = (req,res) => {

    const { login , password } = req.body

    const user = users.find(user => user.login === login)

    if(user && user.password === password){

        console.log('authetic sucessfully')
        res.status(200).json(user)
    } else{
        console.log('not found user')
        res.status(404).json('not found user, please register')
    }


}

const createdUser = (req,res) => {

    const { login , password } = req.body

    const user = users.find(user => user.login === login)

    if(user){
        console.log('user is register')
        res.status(200).json('user is register')
    } 

    const newUser = {
        login,
        password
    }

    users.push(newUser)
    res.status(201).json('Created user sucessfully')

}

module.exports = { getUser ,createdUser}