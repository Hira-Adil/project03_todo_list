#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
// Print welcome message
console.log(chalk.white.bold("\n \t Welcome To The Application Of Todo_List\n"));
//................Use while loop (Select Options).................//
while (condition) {
    let option = await inquirer.prompt([
        {
            name: "multiple_options",
            type: "list",
            message: "select an option",
            choices: ["add", "remove", "Update"]
        }
    ]);
    // ............................. add .............................//
    if (option.multiple_options === "add") {
        let ans = await inquirer.prompt([{
                type: "input",
                name: "todos",
                message: chalk.green("What would you like to add in your todos?\n")
            }]);
        if (ans.todos !== '') {
            todoList.push(ans.todos);
            console.log(todoList);
        }
        else {
            console.log(chalk.green("Please write something to add in your todos"));
        }
    }
    // ............................. remove .............................//
    else if (option.multiple_options === "remove") {
        let remove = await inquirer.prompt([{
                name: "remove_item",
                type: "list",
                message: "select an item to remove",
                choices: todoList
            }]);
        let remove_index = todoList.indexOf(remove.remove_item);
        if (remove_index >= 0) {
            todoList.splice(remove_index, 1);
            console.log("You removed : ", remove.remove_item);
            console.log(todoList);
        }
        else {
            console.log("The To-Do list is Empty. Add something before removing.");
        }
    }
    //.........................Update ......................//
    else if (option.multiple_options === "Update") {
        if (todoList.length > 0) {
            let showUpdate = await inquirer.prompt([{
                    type: "list",
                    name: "updateItem",
                    message: "\nSelect an item to update the todoList:",
                    choices: todoList,
                },
            ]);
            let index = todoList.indexOf(showUpdate.updateItem);
            let editTodoVal = await inquirer.prompt([{
                    type: "input",
                    name: "editItem",
                    message: "\nEnter the updated item:",
                },
            ]);
            if (editTodoVal.editItem !== "") {
                todoList[index] = editTodoVal.editItem;
                console.log("\n operation successfull.");
                console.log("\n\tUpdated ToDo List:");
                todoList.forEach((item) => {
                    console.log(`\t- ${item}`);
                });
            }
            else {
                console.log("\nYou cannot update to an empty item!.\n");
            }
        }
        // ............................. confirmation .............................//
        let usr_ans = await inquirer.prompt([{
                name: "selection",
                type: "confirm",
                message: "Do you want to continue\n",
                default: true
            }]);
        if (usr_ans.selection === false) {
            condition = false;
        }
    }
}
console.log(chalk.green `Thank You For Using Todo List`);
