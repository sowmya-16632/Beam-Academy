import Layout from "../components/Layout";
import RoadmapCard from "../components/RoadmapCard";
import { javaTopics } from "../data/roadmaps";

export default function Java() {
  return (
    <Layout>
      <RoadmapCard
        title="☕ Java Roadmap"
        topics={javaTopics}
      />
    </Layout>
  );
}