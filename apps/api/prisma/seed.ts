import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateSlugs(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/ /g, '-') // replace spaces with hyphens
        .replace(/[^\w-]+/g, '')  // remove all non-word characters except hyphens
}

async function main() {
    const users = Array.from({ length: 10 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
    }));

    await prisma.user.createMany({
        data: users,
    });

    const posts = Array.from({ length: 40 }).map(() => ({
        title: faker.lorem.sentence(),
        slug: generateSlugs(faker.lorem.sentence()),
        content: faker.lorem.paragraphs(3),
        thumbnail: faker.image.urlLoremFlickr(),
        authorId: faker.number.int({ min: 1, max: 10 }),
        published: true,
    }));

    await Promise.all(
        posts.map(async (post) => await prisma.post.create({
            data: {
                ...post,
                comments: {
                    createMany: {
                        data: Array.from({ length: 20 }).map(() => ({
                            Comment: faker.lorem.sentence(),
                            authorId: faker.number.int({ min: 1, max: 10 }),
                        }))
                    }
                }
            }
        }))
    )

    console.log("Seeding completed successfully.");
}

main()
    .then(() => {
        prisma.$disconnect();
        process.exit(0);
    })
    .catch((e) => {
        prisma.$disconnect();
        console.error(e);
        process.exit(1);
    });

