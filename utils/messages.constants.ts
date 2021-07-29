enum ERROR_MSG {
    USER_REGISTER = `Unable to register the user`,
    USER_LOGIN = `Your Email ID / Password does not match your account, please check and try again`,
    USER_EMAIL_EXIST = `This user email already exists !`,
    TASK_CREATE = `Unable to create a task`,
    TASK_UPDATE = `Unable to update a task`,
    TASK_DELETE = `Unable to delete a task`,
    TASK_RETRIEVE_ALL = `Unable to retrieve the task list`,
}

enum SUCCESS_MSG {
    USER_REGISTER = `User successfully registered`,
    USER_LOGIN = `User successfully login`,
    TASK_CREATE = `Task successfully created`,
    TASK_UPDATE = `Task successfully updated`,
    TASK_DELETE = `Task successfully deleted`
}

export { ERROR_MSG, SUCCESS_MSG }