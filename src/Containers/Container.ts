import { Container as ContainerInversify } from "inversify";
import axios, { Axios } from "axios";
import { LaunchesRepository, launchesRepositorySymbol } from "../Repositories/LaunchesRepository";
import { LaunchesRSpaceXRepository } from "../Repositories/LaunchesRSpaceXRepository";
import { LaunchesResumeController } from "../Controllers/LaunchesResumeController";

const container = new ContainerInversify()

container.bind<Axios>(Axios).toDynamicValue(() => axios.create({baseURL: process.env.API_R_SPACEX}))
container.bind<LaunchesRepository>(launchesRepositorySymbol).to(LaunchesRSpaceXRepository)
container.bind<LaunchesResumeController>(LaunchesResumeController).toSelf()

export { container }