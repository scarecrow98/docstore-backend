import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { BodyValidationPipe } from "src/pipes/body-validation.pipe";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectService } from "./project.service";

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {

    constructor(private projectService: ProjectService) {
        
    }

    @Post('create')
    public async create(
        @Body(new BodyValidationPipe()) projectData: CreateProjectDto,
        @Request() request) {
        
        const project = await this.projectService.createProject(request.user, projectData);
        return project;
    }

    @Get('list')
    public async getUserProjects(@Request() request) {
        return this.projectService.getUserProjects(request.user);
    }
}