import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Slider } from "./entity/slider.entity"
import { UserModule } from "src/user/user.module"
import { SliderController } from "./slider.controller"
import { SliderService } from "./slider.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([Slider]),
        UserModule
    ],
    providers: [SliderService],
    controllers: [SliderController]
})
export class SliderModule { }