import { Redirect } from 'expo-router';

export default function ClosetStackIndex() {
    return <Redirect href="/ui/(mainStack)/(drawer)/(closetStack)/myClosetScreen" />;
}