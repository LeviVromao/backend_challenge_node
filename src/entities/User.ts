export default class User {
    public readonly id: string
    private name: string
    private email: string

    constructor(props: Omit<User, 'id' | 'name' | 'email'>, id?: string, name?: string, email?: string){
        Object.assign(this, props)
    }
}