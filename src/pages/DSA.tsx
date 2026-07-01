import Layout from "../components/Layout";
import RoadmapCard from "../components/RoadmapCard";
import { dsaTopics } from "../data/roadmaps";

export default function DSA() {
  return (
    <Layout>
      <RoadmapCard
        title="🧠 DSA Roadmap"
        topics={dsaTopics}
      />
    </Layout>
  );
}