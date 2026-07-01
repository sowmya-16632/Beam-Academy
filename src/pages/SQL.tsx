import Layout from "../components/Layout";
import RoadmapCard from "../components/RoadmapCard";
import { sqlTopics } from "../data/roadmaps";

export default function SQL() {
  return (
    <Layout>
      <RoadmapCard
        title="🗄 SQL Roadmap"
        topics={sqlTopics}
      />
    </Layout>
  );
}