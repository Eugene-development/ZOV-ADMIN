// "use client"
import { getRubrics } from "./server"

export default async () => {
    const data = await getRubrics()
    console.log(data)
  return (
    <>
      {data.rubric.map((feature) => (
                    <div key={feature.id} className="relative pl-10 pt-1">
                      <dt className="inline text-lg font-semibold text-gray-900">

                        {feature.value}
                      </dt>{" "}
                      <br />

                    </div>
                  ))}
    </>
  );
};

