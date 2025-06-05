import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const users = [
  {
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  },
  // Add more users from JSONPlaceholder as needed
];

async function main() {
  console.log('Start seeding...');

  for (const user of users) {
    const { address, company, ...userData } = user;
    
    const createdUser = await prisma.user.create({
      data: {
        ...userData,
        address: {
          create: {
            street: address.street,
            suite: address.suite,
            city: address.city,
            zipcode: address.zipcode,
            lat: address.geo.lat,
            lng: address.geo.lng,
          },
        },
        company: {
          create: company,
        },
        auth: {
          create: {
            email: userData.email,
            passwordHash: await bcrypt.hash('password123', 10),
          },
        },
      },
    });
    
    console.log(`Created user with id: ${createdUser.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 