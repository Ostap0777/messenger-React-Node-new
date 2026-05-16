import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

const contactUserSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  userTag: true,
  isOnline: true,
  avatar: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(ownerId: string) {
    return this.prisma.contact.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
      include: { contactUser: { select: contactUserSelect } },
    });
  }

  async create(ownerId: string, dto: CreateContactDto) {
    const { userTag, email, phone, customName } = dto;

    if (!userTag && !email && !phone) {
      throw new BadRequestException(
        'Provide at least one of: userTag, email, phone',
      );
    }

    const target = await this.prisma.user.findFirst({
      where: {
        OR: [
          userTag ? { userTag } : undefined,
          phone ? { phone } : undefined,
          email ? { email } : undefined,
        ].filter(Boolean) as Prisma.UserWhereInput[],
      },
    });

    if (!target) {
      throw new NotFoundException('User not found');
    }

    if (target.id === ownerId) {
      throw new BadRequestException('Cannot add yourself as a contact');
    }

    try {
      return await this.prisma.contact.create({
        data: {
          ownerId,
          contactUserId: target.id,
          customName: customName ?? null,
        },
        include: {
          contactUser: {
            select: contactUserSelect,
          },
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('Contact already exists');
      }

      throw e;
    }
  }

  async update(ownerId: string, contactId: string, dto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({
      where: { id: contactId },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    if (contact.ownerId !== ownerId) throw new ForbiddenException();

    return this.prisma.contact.update({
      where: { id: contactId },
      data: { customName: dto.customName ?? null },
      include: { contactUser: { select: contactUserSelect } },
    });
  }

  async remove(ownerId: string, contactId: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id: contactId },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    if (contact.ownerId !== ownerId) throw new ForbiddenException();

    await this.prisma.contact.delete({ where: { id: contactId } });
    return { ok: true };
  }
}
