import { LaunchesRepository, launchesRepositorySymbol } from "../Repositories/LaunchesRepository";
import { Launch } from "../Models/Launch";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class LaunchesResumeController
{
    constructor(
        @inject(launchesRepositorySymbol) private launchesRepository: LaunchesRepository
    ){}

    public run(request: Request, response: Response): void
    {
        Promise.all([
            this.launchesRepository.getLasted(),
            this.launchesRepository.getNext(),
            this.launchesRepository.getPast(),
            this.launchesRepository.getUpcoming(),
        ]).then(
            (values) => response.json({
                latest: values[0],
                next: values[1],
                past: values[2],
                upcoming: values[3],
            })
        ).catch(
            error =>  response.status(500).json({
                message: error.message
            })
        )
    }
}