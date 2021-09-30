import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Project, ProjectDocument } from "./schemas/project.schema";

@Injectable()
export class ProjectService {

    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {

    }

    createProject(createdBy: User, projectData: CreateProjectDto) {
        return this.projectModel.create({
            name: projectData.name,
            createdBy: createdBy
        });
    }

    getUserProjects(user: User) {
        return this.projectModel.find({
            createdBy: user
        });
    }
}