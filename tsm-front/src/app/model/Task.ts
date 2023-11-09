import { Categorie } from "./Categorie";
import { User } from "./User";

export class Task{
    task_id:number;
    title:string;
    description:string;
    creationDate:Date;
    dueDate:Date;
    user:User;
    categories:Categorie;
}