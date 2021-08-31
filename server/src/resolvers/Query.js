async function feed(parent, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });



  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    count
  };
}

const users = async (parent, args, context) => {
  console.log(parent, args);
  return await context.prisma.user.findMany();
};

module.exports = {
  feed,
  users
};
