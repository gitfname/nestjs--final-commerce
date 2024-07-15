import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Slider } from "./entity/slider.entity"
import { SliderNotFoundException } from "src/exceptions/SliderNotFoundException"
import { CreateSliderDto } from "./dto/create-slider.dto"
import { UpdateSliderDto } from "./dto/update-slider.dto"

@Injectable()
export class SliderService {
    constructor(
        @InjectRepository(Slider) private readonly sliderRepository: Repository<Slider>
    ) { }

    async createSlider(createSliderDto: CreateSliderDto): Promise<Slider> {
        const slider = new Slider()
        slider.name = createSliderDto.name
        slider.slides = createSliderDto.slides
        await this.sliderRepository.save(slider)
        return slider
    }

    async getAllSliders(): Promise<Slider[]> {
        return await this.sliderRepository.find()
    }

    async getOneSliderById(id: number): Promise<Slider> {
        const slider = await this.sliderRepository.findOneBy({ id })
        if (!slider) throw new SliderNotFoundException()
        return slider
    }

    async updateOneSliderById(id: number, updateSliderDto): Promise<void> {
        await this.sliderRepository.update({ id }, { ...updateSliderDto })
    }

    async deleteSliderById(id: number): Promise<void> {
        await this.sliderRepository.delete(id)
    }
}