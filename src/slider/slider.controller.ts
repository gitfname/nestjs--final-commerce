import { Controller, Get, Post, Patch, Body, Param, Delete, UseGuards } from "@nestjs/common"
import { Roles } from "src/rbac/roles.decoator"
import { AuthGuard } from "src/guards/auth.guard"
import { RoleGuard } from "src/guards/role.guard"
import { SliderService } from "./slider.service"
import { Slider } from "./entity/slider.entity"
import { SliderGetReqParams } from "./dto/slider-get-req-params.dto"
import { SliderUpdateReqParams } from "./dto/slider-update-req-params.dto"
import { UpdateSliderDto } from "./dto/update-slider.dto"
import { SliderDeleteReqParams } from "./dto/slider-delete-req-params.dto"
import { CreateSliderDto } from "./dto/create-slider.dto"
import { ERoles } from "src/rbac/user-roles.enum"

@Controller("sliders")
export class SliderController {
    constructor(
        private readonly sliderService: SliderService
    ) { }

    @Post()
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async createSlider(@Body() createSliderDto: CreateSliderDto): Promise<Slider> {
        return await this.sliderService.createSlider(createSliderDto)
    }

    @Get()
    async getAll(): Promise<Slider[]> {
        return await this.sliderService.getAllSliders()
    }

    @Get(":id")
    async getOneById(@Param() params: SliderGetReqParams): Promise<Slider> {
        return await this.sliderService.getOneSliderById(+params.id)
    }

    @Patch(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async updateOneById(@Param() params: SliderUpdateReqParams, @Body() updateSliderDto: UpdateSliderDto): Promise<void> {
        await this.sliderService.updateOneSliderById(+params.id, updateSliderDto)
    }

    @Delete(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async deleteOneById(@Param() params: SliderDeleteReqParams): Promise<void> {
        await this.sliderService.deleteSliderById(+params.id)
    }
}