import { OnModuleInit } from '@nestjs/common';
import { TopicDef } from './topicsDefs';
export declare class PubSubService implements OnModuleInit {
    private pubsub;
    onModuleInit(): void;
    asyncIterator<T>(topic: string | string[]): AsyncIterator<T>;
    publish<T extends keyof TopicDef>(topic: T, payload: TopicDef[T]): Promise<void>;
}
