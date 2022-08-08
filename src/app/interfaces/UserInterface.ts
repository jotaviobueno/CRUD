export interface UserInterface {

    client_name: string,
    email: string,
    password: string,
}

export interface LoginInterface {

    email: string,
    session_token: string,
}

export interface ChangeNameInterface {
    new_name: string,
    email: string,
    change_date?: number,
}
