exports.handler = async (event, context) => {
    const { user } = context.clientContext;
    const roles = user ? user.app_metadata.roles : false;

    if ( !roles || !roles.some((role) => ['fammy'].includes(role)) ) {
      return {
        statusCode: 402,
        body: JSON.stringify({
          message: `This content requires authentication.`,
        }),
      };
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `HELLO, FRIEND OR FAMILY`,
      }),
    };
  };