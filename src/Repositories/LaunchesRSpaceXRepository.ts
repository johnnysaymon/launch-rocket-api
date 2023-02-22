import { injectable, inject } from "inversify";
import { Launch } from "../Models/Launch";
import { LaunchesRepository } from "./LaunchesRepository";
import { Axios, AxiosResponse } from "axios";

@injectable()
export class LaunchesRSpaceXRepository implements LaunchesRepository
{
    public constructor(
        @inject(Axios) private axios: Axios
    ){}

    public async getLasted(): Promise<Launch|null>
    {
        return this.getOneOrNull('/v4/launches/latest')
    }

    public async getNext(): Promise<Launch|null>
    {
        return this.getOneOrNull('/v4/launches/next')
    }

    public async getPast(): Promise<Launch[]>
    {
        return this.getList('/v4/launches/past')
    }

    public async getUpcoming(): Promise<Launch[]> 
    {
        return this.getList('/v4/launches/upcoming')
    }

    private async getOneOrNull(uri: string): Promise<Launch|null>
    {
        const axiosResponse = await this.get(uri)        

        if (axiosResponse.status !== 200) {
            throw new Error('Error getting data')
        }

        if (axiosResponse.data) {
            return this.createModel(axiosResponse.data)
        }

        return null
    }

    private async get(uri: string): Promise<AxiosResponse>
    {
        try {
            return await this.axios.get(uri)
        } catch(e) {
            throw new Error('Error connecting to data source')
        }
    }

    private async getList(uri: string): Promise<Launch[]>
    {
        const result = await this.get(uri)

        if (Array.isArray(result.data)) {
            return result.data.map(launchData => this.createModel(launchData))
        }

        return []
    }

    private createModel(data: any): Launch
    {
        if(
            !(
                typeof data == 'object' &&
                data.hasOwnProperty('name') && 
                data.hasOwnProperty('date_utc') && 
                data.hasOwnProperty('id')
            )
        ) {
            throw new Error('Invalid data')
        }
        

        return new Launch(
            data.name,
            new Date(data.date_utc),
            data.id
        )
    }
}