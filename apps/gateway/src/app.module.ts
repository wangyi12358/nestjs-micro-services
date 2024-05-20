import { getServiceClientConfig } from '@app/grpc';
import { JWT } from '@app/shared/constants/jwt';
import { SERVICE_PORTS, Services } from '@app/shared/constants/services';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
  AcceptLanguageResolver,
  GraphQLWebsocketResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import * as resolvers from './resolvers';

@Module({
  imports: [
    ClientsModule.register([
      getServiceClientConfig(Services.user, `localhost:${SERVICE_PORTS.USER}`),
    ]),
    // Accept-Language header resolver
    I18nModule.forRoot({
      fallbackLanguage: 'en-US',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        GraphQLWebsocketResolver,
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: (ctx) => ctx,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (params) => ({ connectionParams: params }),
          path: '/graphql',
        },
      },
      typePaths: ['*/**/*.gql'],
      path: '/graphql',
      autoSchemaFile: join(process.cwd(), '/apps/gateway/src/schema.gql'),
    }),
    JwtModule.register({
      global: true,
      secret: JWT.SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  providers: [...Object.values(resolvers)],
})
export class AppModule {}
