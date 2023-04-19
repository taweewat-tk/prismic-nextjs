import Image from "next/image";
import { css, cx } from "@emotion/css";
import NeverLogo from "../public/never-logo.png";
import { getRefKey } from "@/common/services/fetch";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";

type WhyUs = {
  heading: string;
  description: string;
};

type Customers = {
  customer_logo: string;
  customer_name: string;
};

export default function Home({
  whyus,
  customers,
}: {
  whyus: WhyUs;
  customers: Customers[];
}) {
  console.log("🚀 ~ file: index.tsx:31 ~ customers:", customers);
  console.log("🚀 ~ file: index.tsx:8 ~ Home ~ whyus:", whyus);
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <div className="mt-10">
            <Image src={NeverLogo} alt="neversitup" />
          </div>
          <div
            className={cx(
              "uppercase text-4xl font-bold",
              css`
                font-family: "SF Compact Rounded", sans-serif;
                color: rgb(255, 255, 255);
                text-shadow: rgba(255, 255, 255, 0.75) 0px 0px 60px,
                  rgb(0, 0, 0) 0px 0px 3px;
              `
            )}
          >
            Neversitup
          </div>
          <div>
            We enable corporate to develop premium digital solution at startup
            speed
          </div>
        </div>
      </div>
      <div className="bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 mt-20 py-10">
            <div className="text-4xl text-center flex items-center justify-center uppercase">
              {whyus.heading}
            </div>
            <div>{whyus.description}</div>
          </div>
        </div>
      </div>
      <div className="bg-stone-900 text-white">
        <div className="container mx-auto py-10">
          <div className="uppercase text-center text-4xl mb-10">
            Our Customers
          </div>
          <div className="flex justify-center gap-6">
            {customers.map((item, index) => {
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-40 h-40">
                    <Image
                      src={item.customer_logo}
                      alt="neversitup"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="text-center">{item.customer_name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let refKey;
  try {
    refKey = await getRefKey();
  } catch (error) {
    console.error(error);
  }
  console.log(
    "🚀 ~ file: index.tsx:93 ~ getServerSideProps ~ refKey:",
    refKey.refs[0].ref
  );

  const httpLink = createHttpLink({
    uri: "https://test-for-me.prismic.io/graphql",
    headers: {
      Authorization:
        "Token MC5aREUtWnhBQUFDSUFfX3RF.77-977-9W--_ve-_vVHvv73vv70E77-977-9G--_ve-_ve-_vQ3vv70_LO-_ve-_vRFnLO-_vVLvv70_JO-_vUXvv70",
      "Prismic-Ref": refKey.refs[0].ref,
    },
    fetchOptions: {
      method: "GET", // Change the HTTP method here
    },
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
  });

  // CALL GRAPH QL

  let res: any;
  try {
    res = await client.query({
      query: gql`
        query WhyUs {
          allWhyUss {
            edges {
              node {
                head
                description
              }
            }
          }
        }
      `,
    });
  } catch (error) {
    throw error;
  }
  console.log("res", res);

  let customer_response: any;
  try {
    customer_response = await client.query({
      query: gql`
        query allCustomers {
          allCustomers {
            edges {
              node {
                customer_group {
                  customer_logo
                  customer_name
                }
              }
            }
          }
        }
      `,
    });
  } catch (error) {
    throw error;
  }
  console.log("customer_response", customer_response);

  const data = res?.data?.allWhyUss.edges;
  const customer_res = customer_response?.data?.allCustomers.edges;
  if (data || customer_res) {
    return {
      props: {
        whyus: {
          heading: data[0].node.head[0].text,
          description: data[0].node.description[0].text,
        },
        customers: customer_res[0].node.customer_group.map((item: any) => {
          return {
            customer_logo: item.customer_logo.url,
            customer_name: item.customer_name[0].text,
          };
        }),
      },
    };
  }
  // const data = {} as any;
  return {
    props: {
      whyus: {
        heading: "NOPE!",
        description: "NOPE!!",
      },
    },
  };
}
