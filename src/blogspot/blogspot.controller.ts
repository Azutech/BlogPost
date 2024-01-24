import { Controller } from '@nestjs/common';
import { BlogspotService } from './blogspot.service';

@Controller('blogspot')
export class BlogspotController {
  constructor(private readonly blogspotService: BlogspotService) {}
}
