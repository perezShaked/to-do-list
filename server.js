import express from 'express';
import { postgraphile } from 'postgraphile';
//import { ConnectionFilterPlugin } from 'postgraphile-plugin-connection-filter';

const app = express();

app.use(
  postgraphile(
    'postgres://postgres:123456@localhost:5432/shaked',
    'to_do_list', 
    {
      //appendPlugins: [ConnectionFilterPlugin],
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphiql`);
});


