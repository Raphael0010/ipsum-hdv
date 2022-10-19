import { FC, useState } from 'react';
import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { Title } from '@ipsum-hdv/ui/dist/components/title/Title';
import { Select } from '@ipsum-hdv/ui/dist/core/pikas-ui/Select';
import { Label } from '@ipsum-hdv/ui/dist/components/text/label/Label';
import { EJob, jobsFilter } from '../../../utils/job';

const Head = styled('div', {
  textAlign: 'center',
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  '@lg': {
    flexDirection: 'row',
  },
});

const SContainer = styled('div', {
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'normal',
  display: 'flex',
  padding: '$5',
  flex: 1,
  backgroundColor: '$BACKGROUND_LIGHTER',
  borderRadius: '20px',
  overflow: 'hidden',
});

export const CraftContainer: FC = () => {
  const [nbCase, setNbCase] = useState<number>(-1);
  const [job, setJob] = useState<EJob>(-1);

  return (
    <div>
      <Head>
        <Title
          as="h1"
          css={{ h1: { paddingBottom: '30px', paddingTop: '10px' } }}
        >
          CraftOptimizer
        </Title>
      </Head>
      <Container>
        <SContainer>
          <Label>Nombres de cases</Label>
          <Select
            onChange={(e) => setNbCase(Number(e))}
            defaultValue={nbCase.toString()}
            css={{
              container: {
                paddingBottom: '10px',
              },
            }}
            width="auto"
            data={[
              {
                name: 'Nombre de cases',
                items: [
                  {
                    label: 'Aucun filtre',
                    value: '-1',
                  },
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                  {
                    label: '4',
                    value: '4',
                  },
                  {
                    label: '5',
                    value: '5',
                  },
                  {
                    label: '6',
                    value: '6',
                  },
                  {
                    label: '7',
                    value: '7',
                  },
                  {
                    label: '8',
                    value: '8',
                  },
                ],
              },
            ]}
          />

          <Label>Métier</Label>
          <Select
            onChange={(e) => setJob(Number(e))}
            defaultValue={job.toString()}
            width="auto"
            data={[
              {
                name: 'Métier',
                items: jobsFilter.map((e) => ({
                  label: e.name,
                  value: e.jobId.toString(),
                })),
              },
            ]}
          />
        </SContainer>
      </Container>
    </div>
  );
};
