import { NotFoundException } from "@nestjs/common";

export class SliderNotFoundException extends NotFoundException {
    constructor(message?: string) {
        super(message || "slider not found")
    }
}