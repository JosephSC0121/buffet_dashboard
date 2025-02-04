"use server"
import { global } from '@/lib/directus';

export default async function Home() {
	return (
		<div>
			{global.map((item) => (
                <div key={item.id}>
                    <h1>{item.Title}</h1>
                    <p>{item.Description}</p>
                </div>
            ))}
		</div>
	);
}