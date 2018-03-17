import { Location } from "./location";

export class SubPlace {
  constructor(
    public uid: string,
    public title: string,
    public description: string,
    public location: Location,
    public imageUrl: string) {}
}
