import { SafeResourceUrl } from "@angular/platform-browser"

export class UserFront{
    id:number
    name:string
    email:string
    phone:string
    password:string
    avatar:string
    sanitisedImage: SafeResourceUrl;
}