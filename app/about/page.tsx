import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Get to Know Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg mb-4">
            Azzou Spices was born out of a passion for authentic flavors and a desire to bring the world's finest spices to your kitchen. Founded in 1985 by the Azzou family, our journey began in the vibrant markets of Marrakech and has since expanded to source the highest quality spices from around the globe.
          </p>
          <p className="text-lg">
            With over three decades of experience, we've built strong relationships with spice farmers and suppliers, ensuring that every product we offer meets our exacting standards for quality, freshness, and flavor.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Assorted spices"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/icons/quality.svg"
              alt="Quality icon"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Uncompromising Quality</h3>
            <p>We source only the finest spices, ensuring peak flavor and freshness in every package.</p>
          </div>
          <div>
            <Image
              src="/icons/sustainability.svg"
              alt="Sustainability icon"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
            <p>We're committed to ethical sourcing and environmentally friendly packaging.</p>
          </div>
          <div>
            <Image
              src="/icons/customer.svg"
              alt="Customer satisfaction icon"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p>Your culinary success is our top priority. We're here to support your spice journey.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: "Fatima Azzou", role: "Founder & CEO" },
            { name: "Youssef Azzou", role: "Head of Sourcing" },
            { name: "Amira Hassan", role: "Master Blender" },
            { name: "Carlos Rodriguez", role: "Customer Experience Manager" }
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

