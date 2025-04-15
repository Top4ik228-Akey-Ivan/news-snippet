import React, { useState } from 'react';
import {
    Button,
    Card,
    Space,
    Tag,
    Tooltip,
    Typography,
    Divider
} from 'antd';

import './NewsSnippet.scss';
import { NewsSnippetProps } from '../../types/newsSnippet.ts'
import {
    GlobalOutlined,
    FlagOutlined,
    TranslationOutlined,
    DownOutlined,
    UpOutlined,
    FileTextOutlined
} from '@ant-design/icons';

import { formatDate, formatReach } from '../../helpers/helpers';

const { Text, Title, Link } = Typography;

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [showOriginal, setShowOriginal] = useState<boolean>(false);

    const getTopTraffic = () => {
        if (!data.TRAFFIC || data.TRAFFIC.length === 0) return null;

        const sortedTraffic = [...data.TRAFFIC].sort((a, b) => b.count - a.count);
        const topThree = sortedTraffic.slice(0, 3);

        return (
            <Text className="traffic-info">
                Top Traffic:{' '}
                {topThree.map((item, index) => (
                    <Text key={index} className="traffic-item">
                        {item.value} <Text strong>{Math.round(item.count * 100)}%</Text>
                        {index < topThree.length - 1 ? ', ' : ''}
                    </Text>
                ))}
            </Text>
        );
    };

    const combinedHighlights = data.HIGHLIGHTS
        .map(highlight =>
            highlight.replace(/<kw>(.*?)<\/kw>/g, '<span class="keyword">$1</span>')
        )
        .join(' ');

    return (
        <Card className="news-snippet">
            <Space direction="vertical" size={12}>
                {/* Header with date and reach */}
                <div className="top-meta-row">
                    <Space size="large" align="center">
                        <Text className="meta-item">{formatDate(data.DP)}</Text>
                        <Text className="meta-item strong">{formatReach(data.REACH)} Reach</Text>
                    </Space>
                    {getTopTraffic()}
                </div>

                {/* News title */}
                <Title level={4} className="news-title">
                    <Link href={data.URL} target="_blank">
                        {data.TI}
                    </Link>
                </Title>

                {/* Meta information */}
                <Space size="middle" className="meta-info-space">
                    <Tooltip title="Домен источника">
                        <Link href={`https://${data.DOM}`} className="meta-link">
                            <Space size="small">
                                <GlobalOutlined className="meta-icon" />
                                <Text className="meta-text">{data.DOM}</Text>
                            </Space>
                        </Link>
                    </Tooltip>

                    <Tooltip title="Страна">
                        <Space size="small" className="meta-item">
                            <FlagOutlined className="meta-icon" />
                            <Text className="meta-text">{data.CNTR}</Text>
                        </Space>
                    </Tooltip>

                    <Tooltip title="Язык публикации">
                        <Space size="small" className="meta-item">
                            <TranslationOutlined className="meta-icon" />
                            <Text className="meta-text">{data.LANG.toUpperCase()}</Text>
                        </Space>
                    </Tooltip>

                    {data.AU.length > 0 && (
                        <Text className="meta-text italic">{data.AU.join(', ')}</Text>
                    )}
                </Space>

                {/* News highlights */}
                <div className="news-highlights">
                    <div
                        className={`highlight-content ${expanded ? '' : 'collapsed'}`}
                        dangerouslySetInnerHTML={{ __html: combinedHighlights }}
                    />
                    {data.HIGHLIGHTS.join(' ').length > 300 && (
                        <Button
                            type="link"
                            onClick={() => setExpanded(!expanded)}
                            className="show-more-btn"
                            icon={expanded ? <UpOutlined /> : <DownOutlined />}
                        >
                            {expanded ? 'Show less' : 'Show more'}
                        </Button>
                    )}
                </div>

                <Divider className="news-divider" />

                {/* Tags */}
                <Space size={[8, 8]} wrap>
                    {data.KW.map((tag, index) => (
                        <Tag
                            key={index}
                            bordered={false}
                            className="custom-tag"
                        >
                            <Text>{tag.value} </Text>
                            <Text strong>{tag.count}</Text>
                        </Tag>
                    ))}
                </Space>

                {/* Original source section */}
                <div className="original-source-section">
                    <Button
                        type="link"
                        onClick={() => setShowOriginal(!showOriginal)}
                        icon={<FileTextOutlined />}
                        className="original-source-btn"
                    >
                        {showOriginal ? 'Hide Original Source' : 'Show Original Source'}
                    </Button>

                    {showOriginal && (
                        <div className="original-text">
                            {data.AB}
                        </div>
                    )}
                </div>
            </Space>
        </Card>
    );
};

export default NewsSnippet;