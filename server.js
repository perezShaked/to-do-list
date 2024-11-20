import express from 'express';
import cors from 'cors';
import { postgraphile } from 'postgraphile';

const app = express();
app.use(cors());

app.use(
  postgraphile(
    'postgres://postgres:123456@localhost:5432/shaked',
    'to_do_list', 
    {
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphql`);
});


