import { Launch } from "../Models/Launch";

export interface LaunchesRepository
{
    getLasted(): Promise<Launch|null>

    getNext(): Promise<Launch|null>

    getPast(): Promise<Launch[]>

    getUpcoming(): Promise<Launch[]>
}

export const launchesRepositorySymbol = Symbol.for('LaunchesRepository')