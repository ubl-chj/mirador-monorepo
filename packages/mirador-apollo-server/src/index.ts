import {ApolloServer, IResolvers} from 'apollo-server'
import {ManifestAPI} from './ManifestAPI'
import {typeDefs} from './v3Schema'

const resolvers: IResolvers = {
    Query: {
        annotation: async ({}, {manifestId, canvasId, annotationPageId, annotationId}, {dataSources}) => { //eslint-disable-line
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationPageId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationId)[0]
            })
        },
        annotationPage: async ({}, {manifestId, canvasId, annotationPageId}, {dataSources}) => { //eslint-disable-line
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            }).then((res: any) => {
                return res.items.filter((item: any) => item.id === annotationPageId)[0]
            })
        },
        canvas: async ({}, {manifestId, canvasId}, {dataSources}) => { //eslint-disable-line
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.filter((item: any) => item.id === canvasId)[0]
            })
        },
        imageServices: async ({}, {manifestId, type}, {dataSources}) => { //eslint-disable-line
            return dataSources.manifestAPI.getManifest(manifestId).then((res: any) => {
                return res.items.reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.items]
                }, []).reduce((accumulator: any, currentValue: any) => {
                    return [...accumulator, ...currentValue.items]
                }, []).map((a: any) => a.body.service).filter((s: any) => s.type === type)
            })
        },
        manifest: async ({}, {id}, {dataSources}) => { //eslint-disable-line
            return dataSources.manifestAPI.getManifest(id)
        },
    },
}

const server = new ApolloServer({
    context: () => {
        return {
            version: 'application/json;profile=http://iiif.io/api/presentation/3/context.json',
        }
    },
    cors: true,
    dataSources: () => ({
        manifestAPI: new ManifestAPI(),
    }),
    resolvers,
    typeDefs,
    formatError: error => {
        console.log(error);
        return error;
    },
    formatResponse: response => {
        console.log(response);
        return response;
    },
})

server.listen().then(({url}: {url: any}) => {
    console.log(`🚀  Server ready at ${url}`)
})
