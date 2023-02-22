import { LaunchesRepository, launchesRepositorySymbol } from "../Repositories/LaunchesRepository";
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
            this.launchesRepository.getPast(),
            this.launchesRepository.getUpcoming(),
        ]).then(
            function(values){
                const launchesPast = values[0]
                const launchesUpcoming = values[1]

                launchesPast.sort((launchA, launchB) => launchA.date < launchB.date ? 1 : -1)
                const launchLatest = launchesPast.shift()
                launchesUpcoming.sort((launchX, launchY) => launchX.date < launchY.date ? 1 : -1)
                const launchNext = launchesUpcoming.pop()

                response.json({
                    latest: launchLatest,
                    next: launchNext,
                    past: launchesPast,
                    upcoming: launchesUpcoming,
                })
            }
        ).catch(
            error =>  response.status(500).json({
                message: error.message
            })
        )
    }
}