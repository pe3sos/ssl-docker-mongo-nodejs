db.getSiblingDB("$external").runCommand({
  createUser: "CN=admin,OU=client,O=MongoDB,L=Sydney,ST=NSW,C=AU",
  roles: [
    {
      role: "root",
      db: "admin"
    }
  ]
});