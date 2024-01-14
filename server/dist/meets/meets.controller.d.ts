import { MeetsService } from './meets.service';
import { CreateMeetDto } from "./meet.dto";
export declare class MeetsController {
    private readonly meetsService;
    constructor(meetsService: MeetsService);
    createMeet(req: any, createMeetDto: CreateMeetDto): Promise<import("./meets.model").Meets>;
    getAllMeets(page: number, limit: number): Promise<any>;
    getAllMeetsByOrganization(page: number, limit: number, organizationId: string): Promise<{
        data: any[];
        pagination: {
            total: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
}
